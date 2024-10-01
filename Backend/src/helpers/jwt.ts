import Jwt from "jsonwebtoken";

export const giveTokens = (
  userid: number
): { accessToken: string; refreshToken: string } => {
  const payload = {
    userid,
  };
  const accessToken = Jwt.sign(payload, process.env.JWT_SECRET_KAY as string, {
    expiresIn: "1m",
  });

  const refreshToken = Jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET_KEY as string,
    {
      expiresIn: "50m",
    }
  );

  return { accessToken, refreshToken };
};
