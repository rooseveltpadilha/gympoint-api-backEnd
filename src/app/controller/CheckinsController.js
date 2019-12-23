import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enroll from '../models/Enroll';

class CheckinController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const id_student = req.params.id;

    const isStudent = await Student.findOne({ where: { id: id_student } });

    if (!isStudent) {
      return res.status(401).json({ error: 'user is invalid to check in! ' });
    }

    const isEnrolled = await Enroll.findOne({
      where: { student_id: id_student },
    });

    if (!isEnrolled) {
      return res.status(401).json({ error: 'user is not enrolled up! ' });
    }

    const chekins = await Checkin.findAll({
      where: { student_id: id_student },
    });

    return res.json(chekins);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const id_student = req.params.id;

    const isStudent = await Student.findOne({
      where: { id: id_student },
    });

    if (!isStudent) {
      return res.status(401).json({ error: 'user is invalid to check in! ' });
    }

    const isEnrolled = await Enroll.findOne({
      where: { student_id: id_student },
    });

    if (!isEnrolled) {
      return res.status(401).json({ error: 'user is not enrolled up! ' });
    }

    const now = new Date();

    const lastDays = subDays(now, 7);

    const exausted = await Checkin.findAll({
      where: { student_id: id_student },
      date: { [Op.between]: [startOfDay(now), endOfDay(lastDays)] },
    });

    if (exausted && exausted.length >= 5) {
      return res.status(401).json({ error: 'You already used your chekins' });
    }

    const storage = await Checkin.create({
      student_id: id_student,
    });

    return res.json(storage);
  }
}

export default new CheckinController();
