import { format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  // eslint-disable-next-line class-methods-use-this
  get key() {
    return 'WelcomeMail';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ data }) {
    const { planStudent, student } = data;

    const date = new Date();

    const end_date_final = addMonths(date, planStudent.duration);

    const formattedDate = format(
      end_date_final,
      "'dia' dd 'de' MMMM 'de' yyyy",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seja bem vindo à família GymPoint',
      template: 'welcome',
      context: {
        nome: student.name,
        plano: planStudent.title,
        meses: planStudent.duration,
        data: formattedDate,
      },
    });
  }
}

export default new WelcomeMail();
