import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PermissionsRepository } from "../repositories/PermissionsRepository";

class PermissionController {
    async create(request: Request, response: Response) {
        const permissionRepository = getCustomRepository(PermissionsRepository);

        const { name, description } = request.body;

        const existsPermissions = await permissionRepository.findOne({ name });

        if (existsPermissions) {
            return response.status(400).json({ Permission: "Permissions already exists!" });
        }

        const permission = permissionRepository.create({
            name, description
        });

        await permissionRepository.save(permission);

        return response.status(201).json(permission)
    }
}

export default new PermissionController();