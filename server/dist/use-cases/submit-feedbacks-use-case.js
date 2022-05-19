"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbacksUseCase = void 0;
class SubmitFeedbacksUseCase {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(resquest) {
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
exports.SubmitFeedbacksUseCase = SubmitFeedbacksUseCase;
