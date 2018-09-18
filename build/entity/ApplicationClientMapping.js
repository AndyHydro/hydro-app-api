"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let ApplicationClientMapping = class ApplicationClientMapping {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ApplicationClientMapping.prototype, "application_client_mapping_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationClientMapping.prototype, "application_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationClientMapping.prototype, "hydro_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationClientMapping.prototype, "application_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ApplicationClientMapping.prototype, "confirmed", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ApplicationClientMapping.prototype, "create_date", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ApplicationClientMapping.prototype, "update_date", void 0);
ApplicationClientMapping = __decorate([
    typeorm_1.Entity()
], ApplicationClientMapping);
exports.ApplicationClientMapping = ApplicationClientMapping;
