import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";
import { RoleRepository } from "../repositories/RoleRepository";

class UserController {

    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const roleRepository = getCustomRepository(RoleRepository);

        const { name, username, password, roles } = request.body;

        const existsUser = await userRepository.findOne({ username });

        if (existsUser) {
            return response.status(400).json({ message: 'User already exists' });
        }

        const passwordHashed = await hash(password, 8)
        const existsRoles = await roleRepository.findByIds(roles);


        const user = userRepository.create({
            name, 
            username,
            password: passwordHashed,
            roles: existsRoles
           
        });

        await userRepository.save(user);

        return response.status(201).json(user);
    }
}

export default new UserController()