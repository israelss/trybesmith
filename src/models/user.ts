import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import { User } from '../interfaces';

export class UserModel {
  public findUser = async (user: User): Promise<User> => {
    const { username, password } = user;
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';
    const [foundUsers] = await connection.execute<RowDataPacket[]>(query, [username, password]);

    return foundUsers[0] as User;
  };

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