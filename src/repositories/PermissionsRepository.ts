import { Repository, EntityRepository} from "typeorm";
import { Permission } from "../models/Permission";


@EntityRepository(Permission)
class PermissionsRepository extends Repository<Permission> {

}

export { PermissionsRepository }