import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from "jsonwebtoken";


class SessionController {
    async create(request: Request, response: Response) {
        const { username, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ username });

        if (!user) {
            return response.status(400).json({ Erro: "Incorrect password or username !" });
        }

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            return response.status(400).json({ Erro: "Incorrect password or username !" });
        }

        const token = sign({}, "527bd5b5d689e2c32ae974c6229ff785", {
            subject: user.id,
            expiresIn: '1d'
        });

        return response.status(200).json({ User: user, Token: token });
    }
}

export default new SessionController();