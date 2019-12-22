import * as Yup from 'yup';
import Student from '../models/Student';

class StudentsController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const { name, email, idade, peso, altura } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string(),
      idade: Yup.number()
        .integer()
        .required(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const idadeParse = Number(idade);
    const pesoParse = parseFloat(peso);
    const alturaParse = parseFloat(altura);

    const student = await Student.create({
      name,
      email,
      idade: idadeParse,
      peso: pesoParse,
      altura: alturaParse,
    });
    return res.json(student);
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const upId = req.params.id;
    const { name, email, idade, peso, altura } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      idade: Yup.number().integer(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(401).json({ error: 'Validation fails' });
    }

    await Student.update(
      { name, email, idade, peso, altura },
      { where: { id: upId } }
    );

    const updated = await Student.findOne({ where: { id: upId } });

    return res.json(updated);
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req, res) {
    const studentId = req.params.id;

    await Student.destroy({ where: { id: studentId } });

    return res.json({ message: 'Estudante deletado' });
  }
}

export default new StudentsController();
