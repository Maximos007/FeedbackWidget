import { SubmitFeedbacksUseCase } from "./submit-feedbacks-use-case";

const createFeedbackSpy = jest.fn();
const sendMail = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMail }
);

describe('Submit feedback', () => {
  it('should submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a comment',
      screenshot: 'data:image/png;base64,',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalled();
  });

  it('shoul not be able to submit feedback without type',async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'This is a comment',
      screenshot: 'data:image/png;base64,gfthfgxchf45tht885',
    })).rejects.toThrow();
  });

  it('shoul not be able to submit feedback without comment',async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,gfthfgxchf45tht885',
    })).rejects.toThrow();
  });

  it('shoul not be able to submit feedback with an invalid screenshot',async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});
