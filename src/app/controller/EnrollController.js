import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import Enroll from '../models/Enroll';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const enrolls = await Enroll.findAll();
    return res.json(enrolls);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const { student_id, plan_id } = req.body;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const planStudent = await Plan.findByPk(plan_id);

    if (!planStudent) {
      return res.status(401).json({ error: 'Este plano não existe!' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Invalid student' });
    }

    const e = await Enroll.findOne({
      where: { student_id: student.id },
    });

    if (e) {
      return res.status(400).json({ error: 'The student already enrolled up' });
    }

    const date = new Date();

    const end_date_final = addMonths(date, planStudent.duration);
    const price_final = planStudent.duration * planStudent.price;


    const enroll = await Enroll.create({
      student_id,
      plan_id,
      start_date: date,
      end_date: end_date_final,
      price: price_final,
    });

    return res.json(enroll);
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const studentId = req.params.id_stud;
    const { plan_id } = req.body;

    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      student_new: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation invalid' });
    }

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(401).json({ error: 'Usuário não existe!' });
    }

    const enrollExists = await Enroll.findOne({
      where: { student_id: studentId },
    });

    if (!enrollExists) {
      return res.status(400).json({ error: 'This user is not enrolled up!' });
    }

    const planStudent = await Plan.findByPk(plan_id);

    const date = new Date();

    const end_date_final = addMonths(date, planStudent.duration);
    const price_final = planStudent.duration * planStudent.price;

    await Enroll.update(
      {
        plan_id,
        start_date: date,
        end_date: end_date_final,
        price: price_final,
      },
      { where: { student_id: studentId } }
    );

    const updatedEnroll = await Enroll.findOne({
      where: { student_id: studentId },
    });
    return res.json(updatedEnroll);
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req, res) {
    const stuId = req.params.id_stud;

    const studentExists = await Student.findByPk(stuId);

    if (!studentExists) {
      return res.status(400).json({ error: 'Usuário não existe!' });
    }

    await Enroll.destroy({ where: { student_id: stuId } });

    return res.status(200).json({ message: 'Matrícula removida com sucesso' });
  }
}

export default new EnrollController();
