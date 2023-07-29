import { connectDB, slugify } from "@/middleware";
import { SphereSchema, LessonSchema, CourseSchema } from "@/models/spheres/Spheres";
import { NextResponse } from "next/server";


async function handlerGet(req) {
  const { searchParams } = new URL(req.url);

  const query = { slug: searchParams.sphere, 'courses.slug': searchParams.course, 'courses.lessons.slug': searchParams.lesson };
  Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])

  let doc = await SphereSchema.find(query)
  return NextResponse.json(doc, { status: 200 })
}

const wrappedGet = connectDB(handlerGet)

async function handlerPost(req) {
  const body = await request.json()

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
    requirements,
    createNew
  } = body

  if (createNew) {
    if (!!lesson) {

      try {
        const newLesson = new LessonSchema({
          lesson: lesson,
          slug: slug,
          description: description,
          text: text,
          number: number,
          requirements: requirements
        })

        let doc = await SphereSchema.findOneAndUpdate(
          { sphere: sphere, 'courses.course': course },
          { $push: { 'courses.$.lessons': newLesson } },
          { new: true }
        )
        doc.save()
        return NextResponse.json(doc, { status: 200 })

      } catch (error) {
        return NextResponse.json(error.message, { status: 503 })
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
        return NextResponse.json(doc, { status: 200 })
      } catch (error) {
        return NextResponse.json(error.message, { status: 503 })
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
        return NextResponse.json(doc, { status: 200 })
      } catch (error) {
        return NextResponse.json(error.message, { status: 503 })
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
            'courses.$[courseElem].lessons.$[lessonElem].number': number,
            'courses.$[courseElem].lessons.$[lessonElem].requirements': requirements
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

const wrappedPost = connectDB(handlerPost)

export { wrappedGet as GET, wrappedPost as POST }




