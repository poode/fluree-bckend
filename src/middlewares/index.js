import cors from 'cors';
import express from 'express';

export default (app) => {
  app.use(cors());
  app.use(express.json());
}
