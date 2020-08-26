import { User } from './entity';
import { Repository } from 'typeorm';

export interface UserRepository extends Repository<User> {}
