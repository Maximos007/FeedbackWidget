import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacksUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbacksUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) { }

  async execute(resquest: SubmitFeedbacksUseCaseRequest) {
    const { type, comment, screenshot } = resquest;

    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback recebido',
      body: [
        `<p>Novo feedback recebido</p>`,
        `<p><strong>Tipo:</strong> ${type}</p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        screenshot ? `<img src="${screenshot}">` : ``, 
      ].join('\n')
    });
  }
}