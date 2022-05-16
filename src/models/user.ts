import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User } from '../interfaces';

export class UserModel {
  public create = async (user: User): Promise<number> => {
    const { username, classe, level, password } = user;
    const query = `
      INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.execute<ResultSetHeader>(
      query,
      [
        username,
        classe,
        level,
        password,
      ],
    );

    return result.insertId;
  };
}

export default UserModel;