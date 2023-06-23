import connectDB from "../../middleware/mongodb";
import { SphereSchema, LessonSchema, CourseSchema } from "../../models/spheres/Spheres";

const handler = async (req, res) => {
  if (req.method === "GET") {

    let doc = await SphereSchema.find()
    const info = doc
    return res.status(200).send(info)
  }


  if (req.method === 'POST') {
    const { sphere, course, lesson, name, description, createNew } = req.body
    console.log({ createNew })
    if (createNew) {
      if (!!lesson) {

        try {
          const newLesson = new LessonSchema({
            lesson: lesson,
            name: name,
            description: description,
          })

          let doc = await SphereSchema.findOneAndUpdate(
            { sphere: sphere, 'courses.course': course },
            { $push: { 'courses.$.lessons': newLesson } },
            { new: true }
          )
          doc.save()
          return res.status(200).send(doc)

        } catch (error) {
          return res.status(503).send(error.message)
        }

      } else if (!!course) {

        try {
          const newCourse = new CourseSchema({
            course: course,
            name: name,
            description: description,
            lessons: []
          })

          let doc = await SphereSchema.findOneAndUpdate(
            { sphere: sphere },
            { $push: { 'courses': newCourse } },
            { new: true }
          )
          doc.save()
          return res.status(200).send(doc)

        } catch (error) {
          return res.status(503).send(error.message)
        }

      } else {

        try {
          const newSphere = new SphereSchema({
            sphere: sphere,
            name: name,
            description: description,
            courses: []
          })
          const savedSphere = await newSphere.save();
          return res.status(200).send(savedSphere)
        } catch (error) {
          return res.status(500).send(error.message)
        }

      }
    } else {
      if (!!lesson) {
        const updatedSphere = await SphereSchema.findOneAndUpdate(
          {
            sphere: sphere,
            'courses.course': course,
            'courses.lessons.lesson': lesson
          },
          {
            $set: {
              'courses.$[courseElem].lessons.$[lessonElem].name': name,
              'courses.$[courseElem].lessons.$[lessonElem].description': description,
            },
          },
          {
            arrayFilters: [
              { 'courseElem.course': course },
              { 'lessonElem.name': lesson },
            ],
            new: true,
          }
        );

      } else if (!!course) {
        const updatedSphere = await SphereSchema.findOneAndUpdate(
          {
            sphere: sphere,
            'courses.course': course,
          },
          {
            $set: {
              'courses.$.description': description,
              'courses.$.name': name,
            },
          },
          {
            new: true,
          }
        );


      } else {
        const updatedSphere = await SphereSchema.findOneAndUpdate(
          {
            sphere: sphere,
          },
          {
            $set: {
              'description': description,
              'name': name,
            },
          },
          {
            new: true,
          }
        );

      }
    }
  }
}
export default connectDB(handler)