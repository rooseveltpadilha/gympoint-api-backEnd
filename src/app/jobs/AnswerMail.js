import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { updatedEnroll,  studentInfo } = data;

     await Mail.sendMail({
       to: `${studentInfo.name} <${studentInfo.email}>`,
       subject: 'Sua pergunta na GymPoint foi respondida, veja!',
       template: 'answer',
       context: {
         nome: studentInfo.name,
         pergunta: updatedEnroll.question,
         resposta: updatedEnroll.answer,
       },

     });

  }
}

export default new AnswerMail();
