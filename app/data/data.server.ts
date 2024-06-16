export type Courses= {
    id: string;
    title: string;
    description: string;
    duration: string;
    category: string;
}[]



const courses:Courses=[{

    id:"1",
    title:"General Studies",
    description:"",
    duration:"",
    category:"",

},{
    id:"2",
    title:"Civil Services Aptitude Test",
    description:"",
    duration:"",
    category:"",
}]
const course_categories=[{
    id:"1",
    title:"Civil Services Exam",
    description:"",
}]

const getAllCourses=()=>{
    return courses
}

const getCourseCategories=()=>{
    return course_categories
}
export {getAllCourses,getCourseCategories}