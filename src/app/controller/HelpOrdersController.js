import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrdersControllers {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const id_student = req.params.id;

    const verifyId = await Student.findByPk(id_student);

    if (!verifyId) {
      res.status(401).json({ error: 'This user does not exist!' });
    }

    const results = await HelpOrder.findAll({
      where: { student_id: id_student },
    });

    return res.json(results);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const id_student = req.params.id;

    const verifyId = await Student.findByPk(id_student);

    if (!verifyId) {
      res.status(401).json({ error: 'This user does not exist!' });
    }

    const { question } = req.body;

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(401).json({ error: 'Validation fails!' });
    }

    const created = await HelpOrder.create({
      student_id: id_student,
      question,
    });

    return res.json(created);
  }
}

export default new HelpOrdersControllers();
