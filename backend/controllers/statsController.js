const CareLog = require('../models/CareLog');
const UserGarden = require('../models/UserGarden');

// @desc    Get stats for a specific plant
// @route   GET /api/stats/:plantId
// @access  Private
const getPlantStats = async (req, res) => {
    try {
        const { plantId } = req.params;

        // Get all care logs for this plant
        const logs = await CareLog.find({
            user: req.user.id,
            gardenPlant: plantId
        }).sort({ date: -1 });

        // Count by action type
        const actionCounts = logs.reduce((acc, log) => {
            acc[log.actionType] = (acc[log.actionType] || 0) + 1;
            return acc;
        }, {});

        // Get last 30 days of activity for chart
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentLogs = logs.filter(log => new Date(log.date) >= thirtyDaysAgo);

        // Group by date for timeline
        const timeline = recentLogs.reduce((acc, log) => {
            const dateKey = new Date(log.date).toISOString().split('T')[0];
            if (!acc[dateKey]) {
                acc[dateKey] = { date: dateKey, watering: 0, fertilizing: 0, pruning: 0, other: 0 };
            }
            acc[dateKey][log.actionType] = (acc[dateKey][log.actionType] || 0) + 1;
            return acc;
        }, {});

        // Get last action dates
        const lastWatering = logs.find(l => l.actionType === 'watering');
        const lastFertilizing = logs.find(l => l.actionType === 'fertilizing');

        res.status(200).json({
            totalLogs: logs.length,
            actionCounts,
            timeline: Object.values(timeline).sort((a, b) => a.date.localeCompare(b.date)),
            recentLogs: logs.slice(0, 10),
            lastWatering: lastWatering?.date || null,
            lastFertilizing: lastFertilizing?.date || null,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get overview stats for all plants
// @route   GET /api/stats/overview
// @access  Private
const getOverviewStats = async (req, res) => {
    try {
        // Get all user's garden plants
        const garden = await UserGarden.find({ user: req.user.id });

        // Get all care logs for user in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentLogs = await CareLog.find({
            user: req.user.id,
            date: { $gte: sevenDaysAgo }
        }).populate('gardenPlant', 'name');

        // Count actions per plant for bar chart
        const plantActivity = garden.map(plant => {
            const plantLogs = recentLogs.filter(
                log => log.gardenPlant?._id?.toString() === plant._id.toString()
            );
            return {
                _id: plant._id,
                name: plant.name,
                totalActions: plantLogs.length,
                watering: plantLogs.filter(l => l.actionType === 'watering').length,
                fertilizing: plantLogs.filter(l => l.actionType === 'fertilizing').length,
                pruning: plantLogs.filter(l => l.actionType === 'pruning').length,
            };
        });

        // Calculate summary stats
        const totalActionsThisWeek = recentLogs.length;
        const plantsWithNoActivity = plantActivity.filter(p => p.totalActions === 0).length;

        res.status(200).json({
            totalPlants: garden.length,
            totalActionsThisWeek,
            plantsNeedingAttention: plantsWithNoActivity,
            plantActivity,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Quick log a care action
// @route   POST /api/stats/log
// @access  Private
const quickLogAction = async (req, res) => {
    try {
        const { gardenPlantId, actionType, notes } = req.body;

        if (!gardenPlantId || !actionType) {
            return res.status(400).json({ message: 'Plant ID and action type required' });
        }

        const log = await CareLog.create({
            user: req.user.id,
            gardenPlant: gardenPlantId,
            actionType,
            notes: notes || `${actionType} logged`,
            date: new Date(),
        });

        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPlantStats,
    getOverviewStats,
    quickLogAction,
};
