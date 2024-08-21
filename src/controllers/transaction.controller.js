const db = require("../models");
const Transaction = db.transaction;
const User = db.user;
const UserAccount = db.useraccount;
const ServiceProvider = db.serviceprovider;

const test = async (req, res) => {
    await res.status(200).json({ msg: "Transaction is running." });
};

const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const { content, amount, service } = req.body;

        // Check if User exists
        const userAccount = await UserAccount.findOne({ where: { id: userId } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Check if ServiceProvider exists
        const serviceProvider = await ServiceProvider.findOne({
            where: { name: service },
        });
        if (!serviceProvider) {
            return res.status(404).json({ msg: "ServiceProvider not found." });
        }
        const serviceId = serviceProvider.id;

        // Check if transaction exists
        const transaction = await Transaction.findOne({
            where: { content, userId: userId, serviceId: serviceId },
        });
        if (transaction) {
            return res.status(400).json({ msg: "Transaction already exists." });
        }

        // Create new transaction
        const newTransaction = await Transaction.create({
            content,
            amount,
            userId: userId,
            serviceId: serviceId,
        });

        res.status(201).json({
            msg: "Transaction created successfully.",
            newTransaction,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const update = async (req, res) => {
    try {
        const userId = req.user.id;
        const { content, amount, service } = req.body;

        const serviceProvider = await ServiceProvider.findOne({
            where: { name: service },
        });
        if (!serviceProvider) {
            return res.status(404).json({ msg: "ServiceProvider not found." });
        }
        const serviceId = serviceProvider.id;

        // Check if transaction exists
        const transaction = await Transaction.findOne({
            where: { content, userId: userId, serviceId: serviceId },
        });
        if (!transaction) {
            return res.status(404).json({ msg: "Transaction not found." });
        }

        // Update transaction
        transaction.amount = amount;
        await transaction.save();
        res.status(200).json({
            msg: "Transaction updated successfully.",
            transaction,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTrans = async (req, res) => {
    try {
        const userId = req.user.id;
        const { service } = req.body;

        const serviceProvider = await ServiceProvider.findOne({
            where: { name: service },
        });
        if (!serviceProvider) {
            return res.status(404).json({ msg: "ServiceProvider not found." });
        }
        const serviceId = serviceProvider.id;

        // Check if transaction exists
        const transaction = await Transaction.findOne({
            where: { user: userId, serviceId: serviceId },
        });
        if (!transaction) {
            return res.status(404).json({ msg: "Transaction not found." });
        }

        if(transaction.status) {
            return res.status(400).json({ msg: "Transaction already paid." });
        }

        // Delete transaction
        await transaction.destroy();
        res.status(200).json({ msg: "Transaction deleted successfully." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const paid = async (req, res) => {
    try {
        const { userId, serviceId } = req.params;

        // Check if transaction exists
        const transaction = await Transaction.findOne({
            where: { user: userId, service: serviceId },
        });
        if (!transaction) {
            return res.status(404).json({ msg: "Transaction not found." });
        }
        
        // Check if transaction is paid
        if (transaction.status) {
            return res.status(400).json({ msg: "Transaction already paid." });
        }

        // Update transaction
        transaction.status = true;
        await transaction.save();
        res.status(200).json({
            msg: "Transaction paid successfully.",
            transaction,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { test, create, update, deleteTrans, paid };
