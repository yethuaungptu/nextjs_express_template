const {
    ok,
    error,
    created,
    retrieved,
    updated,
    deleted,
    paginatedData,
    getAdmin,
    authFail
} = require('./base.controller');
const Plan = require('../models/plan.model');
const User = require('../models/user.model');

exports.index = (req, res) => {
    ok(res, 'Done', 'abc');
};

//start plan
exports.createPlan = (req, res) => {
    const plan = new Plan();
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        plan.plan = req.body.plan;
        plan.expire = req.body.expire;
        plan.remark = req.body.remark || '';
        plan.creator = admin.id;
        plan.updater = admin.id;
        plan.save((err, rtn) => {
            console.log(err);
            if (err) error(res, 'Internal server error', err);
            else created(res, 'Plan', rtn);
        });
    }
};

exports.planList = (req, res) => {
    Plan.find((err, rtn) => {
        console.log(rtn);
        if (err) error(res, 'Internal server error', err);
        else retrieved(res, 'Plan List', rtn);
    });
};

exports.planUpdate = (req, res) => {
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        const update = {
            expire: req.body.expire,
            remark: req.body.remark || '',
            updater: admin.id
        };
        Plan.findByIdAndUpdate(req.body.id, { $set: update }, (err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else updated(res, 'Plan Update success', rtn);
        });
    }
};

exports.planDelete = (req, res) => {
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        const update = {
            isDeleted: true,
            updater: admin.id
        };
        Plan.findByIdAndUpdate(req.body.id, { $set: update }, (err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else deleted(res, 'Plan Delete success', rtn);
        });
    }
};

exports.planNameCheck = (req, res) => {
    Plan.findOne({ plan: req.body.plan }, (err, rtn) => {
        if (err) error(res, 'Internal server error', err);
        rtn != null
            ? ok(res, 'Plan name is duplicated', { status: true })
            : ok(res, 'Plan name is not duplicated', { status: false });
    });
};
//end plan

//start user
exports.addUser = (req, res) => {
    const user = new User();
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        user.username = req.body.username;
        user.password = req.body.password;
        user.planId = req.body.plan;
        user.creator = admin.id;
        user.updater = admin.id;
        user.save((err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else created(res, 'User', rtn);
        });
    }
};

exports.userList = (req, res) => {
    User.find({})
        .populate('planId', 'plan expire')
        .exec((err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else retrieved(res, 'User List', rtn);
        });
};

exports.userDetail = (req, res) => {
    User.findById(req.params.id)
        .populate('planId', 'plan expire')
        .exec((err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else retrieved(res, 'User Detail', rtn);
        });
};

exports.userUpdate = (req, res) => {
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        const update = {
            planId: req.body.plan,
            status: req.body.status,
            invitationCount: req.body.invitationCount || 200,
            updater: admin.id
        };
        User.findByIdAndUpdate(req.body.id, { $set: update }, (err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else updated(res, 'User Update success', rtn);
        });
    }
};

exports.userDelete = (req, res) => {
    const admin = getAdmin(req);
    if (!admin) {
        authFail(res);
    } else {
        const update = {
            isDeleted: true,
            updater: admin.id
        };
        User.findByIdAndUpdate(req.body.id, { $set: update }, (err, rtn) => {
            if (err) error(res, 'Internal server error', err);
            else deleted(res, 'User Delete success', rtn);
        });
    }
};

exports.userNameCheck = (req, res) => {
    User.findOne({ username: req.body.username }, (err, rtn) => {
        if (err) error(res, 'Internal server error', err);
        rtn != null
            ? ok(res, 'Username is duplicated', { status: true })
            : ok(res, 'Username is not duplicated', { status: false });
    });
};
//end user
