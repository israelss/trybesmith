import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User } from '../interfaces';

export class UserModel {
  public create = async (user: User): Promise<void> => {
    const { username, classe, level, password } = user;
    const query = `
      INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute<ResultSetHeader>(
      query,
      [
        username,
        classe,
        level,
        password,
      ],
    );
  };
}

export default UserModel;