import { connectDB, slugify } from "../../../middleware";
import { SphereSchema, LessonSchema, CourseSchema } from "../../../models/spheres/Spheres";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // setting up a query object and pruning invalid values
    const query = { slug: req.query.sphere, 'courses.slug': req.query.course, 'courses.lessons.slug': req.query.lesson };
    Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])

    let doc = await SphereSchema.find(query)

    return res.status(200).send(doc)
  }


  if (req.method === 'POST') {
    const {
      sphere,
      course,
      lesson,
      slug,
      description,
      show,
      disable,
      linear,
      text,
      number,
      createNew
    } = req.body

    if (createNew) {
      if (!!lesson) {

        try {
          const newLesson = new LessonSchema({
            lesson: lesson,
            slug: slug,
            description: description,
            text: text,
            number: number
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
            slug: slugify(course),
            description: description,
            linear: linear,
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
            slug: slugify(sphere),
            show: show,
            disable: disable,
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
            'courses': {
              $elemMatch: {
                course: course,
                'lessons.lesson': lesson
              }
            }
          },
          {
            $set: {
              'courses.$[courseElem].lessons.$[lessonElem].slug': slug,
              'courses.$[courseElem].lessons.$[lessonElem].description': description,
              'courses.$[courseElem].lessons.$[lessonElem].text': text,
              'courses.$[courseElem].lessons.$[lessonElem].number': number
            }
          },
          {
            arrayFilters: [
              { 'courseElem.course': course },
              { 'lessonElem.lesson': lesson }
            ],
            new: true
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
              'courses.$.slug': slugify(course),
              'courses.$.linear': linear,
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
              'slug': slugify(sphere),
              'show': show,
              'disable': disable
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