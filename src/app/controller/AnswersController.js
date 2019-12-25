import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class AnswersController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const help = await HelpOrder.findAll({ where: { answer: null } });

    return res.json(help);
  }
  
  async store(req, res) {
    const id_answer = req.params.id;

    const verifyId = await HelpOrder.findByPk(id_answer);

    if (!verifyId) {
      return res.json('This question does not exists');
    }

    const { answer } = req.body;

    const schema = Yup.object().shape({
      answer: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fails');
    }

    const answer_at = new Date();

    await HelpOrder.update({ answer, answer_at }, { where: { id: id_answer } });

    const updatedEnroll = await HelpOrder.findByPk(id_answer);
    const studentInfo = await Student.findByPk(updatedEnroll.student_id);

    await Queue.add(AnswerMail.key, { updatedEnroll,  studentInfo });

    return res.json(updatedEnroll);
  }
}

export default new AnswersController();
