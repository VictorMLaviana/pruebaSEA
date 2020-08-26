import { Role } from './entity';
import { Repository } from 'typeorm';

export interface RoleRepository extends Repository<Role> {}
