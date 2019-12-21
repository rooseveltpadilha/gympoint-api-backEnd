import Student from '../models/Student';
import User from '../models/User';

class StudentsController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const { name, email, idade, peso, altura } = req.body;

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
    const studentId = req.params.id;

    const { name, email, idade, peso, altura } = req.body;

    await Student.update(
      { name, email, idade, peso, altura },
      { where: { id: studentId } }
    );

    const updated = await Student.findOne({ where: { id: studentId } });

    return res.json(updated);
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req, res) {
    const idStudent = req.params.id;

    await Student.destroy({ where: { id: idStudent } });

    return res.json({ message: 'Estudante deletado' });
  }
}

export default new StudentsController();
