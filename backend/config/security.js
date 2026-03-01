import cors from "cors";

export const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://geniral.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};
