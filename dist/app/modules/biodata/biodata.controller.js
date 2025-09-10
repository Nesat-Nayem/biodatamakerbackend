"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBiodataById = exports.updateBiodataById = exports.getBiodataById = exports.getAllBiodata = exports.createBiodata = void 0;
const biodata_model_1 = require("./biodata.model");
const biodata_validation_1 = require("./biodata.validation");
const appError_1 = require("../../errors/appError");
const createBiodata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { title, godName, sections, template } = req.body;
        // Accept sections as JSON string or object
        let parsedSections = sections;
        if (typeof sections === 'string') {
            try {
                parsedSections = JSON.parse(sections);
            }
            catch (e) {
                return next(new appError_1.appError('Invalid JSON for sections', 400));
            }
        }
        const profileFile = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePhoto) === null || _b === void 0 ? void 0 : _b[0];
        const godFile = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.godPhoto) === null || _d === void 0 ? void 0 : _d[0];
        const validated = biodata_validation_1.biodataCreateValidation.parse({
            title,
            godName,
            sections: parsedSections,
            template,
            profilePhoto: profileFile === null || profileFile === void 0 ? void 0 : profileFile.path,
            godPhoto: godFile === null || godFile === void 0 ? void 0 : godFile.path,
        });
        const doc = new biodata_model_1.Biodata(Object.assign(Object.assign({}, validated), { user: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id }));
        yield doc.save();
        res.status(201).json({ success: true, statusCode: 201, message: 'Biodata created successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.createBiodata = createBiodata;
const getAllBiodata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const filter = { isDeleted: false };
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
            filter.user = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        }
        const docs = yield biodata_model_1.Biodata.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, statusCode: 200, message: 'Biodata retrieved successfully', data: docs });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBiodata = getAllBiodata;
const getBiodataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const filter = { _id: req.params.id, isDeleted: false };
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin')
            filter.user = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const doc = yield biodata_model_1.Biodata.findOne(filter);
        if (!doc)
            return next(new appError_1.appError('Biodata not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Biodata retrieved successfully', data: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.getBiodataById = getBiodataById;
const updateBiodataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const existing = yield biodata_model_1.Biodata.findOne({ _id: req.params.id, isDeleted: false });
        if (!existing)
            return next(new appError_1.appError('Biodata not found', 404));
        const { title, godName, sections, template } = req.body;
        let updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (godName !== undefined)
            updateData.godName = godName;
        if (template !== undefined)
            updateData.template = template;
        if (sections !== undefined) {
            if (typeof sections === 'string') {
                try {
                    updateData.sections = JSON.parse(sections);
                }
                catch (e) {
                    return next(new appError_1.appError('Invalid JSON for sections', 400));
                }
            }
            else {
                updateData.sections = sections;
            }
        }
        const profileFile = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePhoto) === null || _b === void 0 ? void 0 : _b[0];
        const godFile = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.godPhoto) === null || _d === void 0 ? void 0 : _d[0];
        if (profileFile)
            updateData.profilePhoto = profileFile.path;
        if (godFile)
            updateData.godPhoto = godFile.path;
        const validated = biodata_validation_1.biodataUpdateValidation.parse(updateData);
        const updated = yield biodata_model_1.Biodata.findByIdAndUpdate(req.params.id, validated, { new: true });
        res.json({ success: true, statusCode: 200, message: 'Biodata updated successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBiodataById = updateBiodataById;
const deleteBiodataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield biodata_model_1.Biodata.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!updated)
            return next(new appError_1.appError('Biodata not found', 404));
        res.json({ success: true, statusCode: 200, message: 'Biodata deleted successfully', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBiodataById = deleteBiodataById;
