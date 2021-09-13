import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PermissionsRepository } from "../repositories/PermissionsRepository";
import { RoleRepository } from "../repositories/RoleRepository";


class RoleController {
    async create(request: Request, response: Response) {

        const roleRepository = getCustomRepository(RoleRepository);
        const permissionsRepository = getCustomRepository(PermissionsRepository);

        const { name, description, permissions } = request.body;

        const roleExists = await roleRepository.findOne({ name });

        if (roleExists) {
            return response.status(400).json({ Role: "Role already exists" })
        }

        const  existsPermissions = await permissionsRepository.findByIds(permissions);


        const role = roleRepository.create({
            name, 
            description,
            permission: existsPermissions
          
        });

        await roleRepository.save(role);

        return response.status(201).json(role)
    }
}

export default new RoleController();