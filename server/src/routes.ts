import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbacksUseCase } from './use-cases/submit-feedbacks-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();


  const submitFeedbacksUseCase = new SubmitFeedbacksUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
    )
  
  await submitFeedbacksUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).send();

});