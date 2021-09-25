/**
 * @api {get} /api/courses Get Courses
 * @apiName GetCourses
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiParam {String} url The link of the course you want to find (optional)
 * 
 * @apiParamExample {json} Get Course By URL
 * {
 * 	"url": "https://www.coursera.org/learn/learning-how-to-learn"
 * }
 * 
 * @apiParam {String} tag An tag to filter the courses you want to find (optional)
 * 
 * @apiParamExample {json} Get Courses By Tag
 * {
 * 	"tag": "Something else"
 * }
 * 
 * @apiSuccess (200) {Array} Courses An array of the courses on the website, optionally filtered by url sent in body
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * 
 * [
 *   {
 *     "id": 1,
 *     "name": "Learning How to Learn",
 *     "link": "https://www.coursera.org/learn/learning-how-to-learn",
 *     "description": "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects.\n\nUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide.",
 *     "category": null,
 *     "creator_id": 1,
 *     "foreign_rating": "4.8 stars",
 *     "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski"
 *   },
 *   {
 *     "id": 2,
 *     "name": "Mindshift: Break Through Obstacles to Learning and Discover Your Hidden Potential",
 *     "link": "https://www.coursera.org/learn/mindshift",
 *     "description": "Mindshift is designed to help boost your career and life in today’s fast-paced learning environment. Whatever your age or stage, Mindshift teaches you essentials such as how to get the most out of online learning and MOOCs, how to seek out and work with mentors, the secrets to avoiding career ruts (and catastrophes) and general ruts in life, and insights such as the value of selective ignorance over general competence.  We’ll provide practical insights from science about how to learn and change effectively even in maturity, and we’ll build on what you already know to take your life’s learning in fantastic new directions.  This course is designed to show you how to look at what you’re learning, and your place in what’s unfolding in the society around you, so you can be what you want to be, given the real world constraints that life puts on us all. You’ll see that by using certain mental tools and insights, you can learn and do more—far more—than you might have ever dreamed! This course can be taken independent of, concurrent with, or subsequent to, its companion course, Learning How to Learn. (Mindshift is more career focused, and Learning How to Learn is more learning focused.)",
 *     "category": null,
 *     "creator_id": 1,
 *     "foreign_rating": "4.8 stars",
 *     "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski, M.S. Orlando Trejo"
 *   },
 *   {
 *     "id": 3,
 *     "name": "AbyssMind Performance Email Course",
 *     "link": "https://www.abyssmind.com/performance/try](https://www.abyssmind.com/performance/try",
 *     "description": "AbyssMind is a learning outcomes program that helps you understand the skills and techniques needed to succeed in your self-directed learning ambitions.  Sign up",
 *     "category": null,
 *     "creator_id": 2,
 *     "foreign_rating": null,
 *     "foreign_instructors": "AbyssMind"
 *   }
 * ]
 * 
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not retrieve courses
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Error connecting with server"
 * }
 * 
 */

/**
 * @api {get} /api/courses/allyours Get All Courses That User Is Signed Up For
 * @apiName GetAllCoursesForUser
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Array} Courses An array of the courses for the user on the website
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * 
 * [
 *   {
 *     "id": 1,
 *     "name": "Learning How to Learn",
 *     "link": "https://www.coursera.org/learn/learning-how-to-learn",
 *     "description": "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects.\n\nUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide.",
 *     "category": null,
 *     "creator_id": 1,
 *     "foreign_rating": "4.8 stars",
 *     "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski",
 *     "manually_completed": 0,
 *     "automatically_completed": 0
 *   },
 *   {
 *     "id": 2,
 *     "name": "Mindshift: Break Through Obstacles to Learning and Discover Your Hidden Potential",
 *     "link": "https://www.coursera.org/learn/mindshift",
 *     "description": "Mindshift is designed to help boost your career and life in today’s fast-paced learning environment. Whatever your age or stage, Mindshift teaches you essentials such as how to get the most out of online learning and MOOCs, how to seek out and work with mentors, the secrets to avoiding career ruts (and catastrophes) and general ruts in life, and insights such as the value of selective ignorance over general competence.  We’ll provide practical insights from science about how to learn and change effectively even in maturity, and we’ll build on what you already know to take your life’s learning in fantastic new directions.  This course is designed to show you how to look at what you’re learning, and your place in what’s unfolding in the society around you, so you can be what you want to be, given the real world constraints that life puts on us all. You’ll see that by using certain mental tools and insights, you can learn and do more—far more—than you might have ever dreamed! This course can be taken independent of, concurrent with, or subsequent to, its companion course, Learning How to Learn. (Mindshift is more career focused, and Learning How to Learn is more learning focused.)",
 *     "category": null,
 *     "creator_id": 1,
 *     "foreign_rating": "4.8 stars",
 *     "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski, M.S. Orlando Trejo",
 *     "manually_completed": 0,
 *     "automatically_completed": 0
 *   }
 * ]
 * 
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not retrieve courses
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not get all courses"
 * }
 * 
 */

/**
 * @api {post} /api/courses/checkdb Check Database For Course With Link
 * @apiName CheckDatabaseForCourseWithLink
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiParam {String} link The link of the course you want to check
 * 
 * @apiParamExample {json} Check-Database-For-Link-Example:
 * { 
 * 	 "link": "fakelink.com",
 * }
 * 
 * @apiSuccess (200) {Object} CourseFoundObject an object detailing whether the course was found
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *        "courseFound": false,
 *        "id": -1
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not get courses
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not get courses"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not find user to get courses for
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to get courses for"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not find user
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user"
 * }
 * 
 */

/**
 * @api {get} /api/courses/:id/yours Get Course by ID The User Is In Learning Path For
 * @apiName GetCourseByIDYours
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {object} Course An object of the course matching the id param
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 2,
 *   "name": "Mindshift: Break Through Obstacles to Learning and Discover Your Hidden Potential",
 *   "link": "https://www.coursera.org/learn/mindshift",
 *   "description": "Mindshift is designed to help boost your career and life in today’s fast-paced learning environment. Whatever your age or stage, Mindshift teaches you essentials such as how to get the most out of online learning and MOOCs, how to seek out and work with mentors, the secrets to avoiding career ruts (and catastrophes) and general ruts in life, and insights such as the value of selective ignorance over general competence.  We’ll provide practical insights from science about how to learn and change effectively even in maturity, and we’ll build on what you already know to take your life’s learning in fantastic new directions.  This course is designed to show you how to look at what you’re learning, and your place in what’s unfolding in the society around you, so you can be what you want to be, given the real world constraints that life puts on us all. You’ll see that by using certain mental tools and insights, you can learn and do more—far more—than you might have ever dreamed! This course can be taken independent of, concurrent with, or subsequent to, its companion course, Learning How to Learn. (Mindshift is more career focused, and Learning How to Learn is more learning focused.)",
 *   "category": null,
 *   "creator_id": 1,
 *   "foreign_rating": "4.8 stars",
 *   "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski, M.S. Orlando Trejo",
 *   "tags": [
 *     "Video",
 *     "Coursera",
 *     "Free"
 *   ],
 *   "total": 69,
 *   "completed": 0,
 *   "manually_completed": 0,
 *   "automatically_completed": 0
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} Course-Not-Found The course isn't in the database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Course Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not retrieve course
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Error connecting with server"
 * }
 * 
 */

/**
 * @api {get} /api/courses/:id Get Course by ID
 * @apiName GetCourseByID
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {object} Course An object of the course matching the id param
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *     "id": 1,
 *     "name": "Learning How to Learn: Powerful mental tools to help you master tough subjects",
 *     "link": "https://www.coursera.org/learn/learning-how-to-learn",
 *     "description": "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects.\n\nUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide.",
 *     "category": null,
 *     "creator_id": 1,
 *     "foreign_rating": "4.8 stars",
 *     "foreign_instructors": "Dr. Barbara Oakley, Dr. Terrence Sejnowski"
 *  }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} Course-Not-Found The course isn't in the database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Course Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (500) {Object} internal-server-error Could not retrieve course
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Error connecting with server"
 * }
 * 
 */

/**
 * @api {post} /api/courses Post Course
 * @apiName PostCourse
 * @apiGroup Courses
 *  
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiParam {String} name The name of the course you want to create
 * @apiParam {String} description The description of the course you want to create
 * @apiParam {String} link The link of the course you want to create

 * 
 * @apiParamExample {json} Course-Post-Example:
 * { 
 * 	 "name": "Learn How to Write Docs",
 * 	 "description": "In this course, you will learn the tedium of writing docs.",
 * 	 "link": "http://apidocjs.com/",
 * }
 * 
 * @apiSuccess (201) {integer} Id An id of the course that the user posted
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 *  {
 *     "id": 2
 *  }
 * 
 * @apiError (400) {Object} Missing-Course-Data The course data is absent
 * 
 * @apiErrorExample 400-Course-Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Missing course data"
 * }
 * 
 * @apiError (400) {Object} Missing-Course-Name The course name is absent
 * 
 * @apiErrorExample 400-Name-Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Course name is required"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to add course for
 * 
 * @apiErrorExample 500-User-Not-Found:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to add course for"
 * }
 * 
 * @apiError (500) {Object} Add-Course-Error Could not add course
 * 
 * @apiErrorExample 500-Course-Add-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not add course"
 * }
 * 
 */

/**
 * @api {put} /api/courses/:id Edit Course
 * @apiName EditCourse
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Success A message that the course was updated
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *     "message": "course updated"
 *  }
 * 
 * @apiError (400) {Object} Missing-Course-Data The course data is absent
 * 
 * @apiErrorExample 400-Course-Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Missing course data"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (403) {Object} bad-request-error The user is not authorized to edit this course
 * 
 * @apiErrorExample 403-Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 *  "message": "User is not permitted to change this course"
 * }
 * 
 * @apiError (404) {Object} not-found-error The course with id sent was not found in database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to edit course for
 * 
 * @apiErrorExample 500-User-Not-Found:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to edit course for"
 * }
 * 
 * @apiError (500) {Object} Edit-Course-Error Could not edit course
 * 
 * @apiErrorExample 500-Course-Edit-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not edit course"
 * }
 * 
 */

/**
 * @api {delete} /api/courses/:id Delete Course
 * @apiName DeleteCourse
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Success A message that the course was deleted
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *     "message": "course deleted"
 *  }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (403) {Object} bad-request-error The user is not authorized to delete this course
 * 
 * @apiErrorExample 403-Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 *  "message": "User is not permitted to change this course"
 * }
 * 
 * @apiError (404) {Object} not-found-error The course with id sent was not found in database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to delete course for
 * 
 * @apiErrorExample 500-User-Not-Found:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to delete course for"
 * }
 * 
 * @apiError (500) {Object} Delete-Course-Error Could not delete course
 * 
 * @apiErrorExample 500-Course-Delete-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not delete course"
 * }
 * 
 */

/**
 * @api {post} /api/courses/:id/tags Post Tag To Course
 * @apiName PostTagToCourse
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiParam {Object} tag The name of the tag you want to create/add for the course
 * 
 * @apiParamExample {json} Tag Post Example:
 * { 
        tag: 'Learning'
 * }
 * 
 * @apiSuccess (201) {string} Message A message that the tag was added
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 *  {
 *     message: 'tag added to course'
 *  }
 * 
 * @apiError (400) {Object} Missing-Tag-Data The tag data is absent
 * 
 * @apiErrorExample 400 Tag Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Missing tag data"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (403) {Object} bad-request-error The user is not authorized to add tag to this course
 * 
 * @apiErrorExample 403-Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 *  "message": "User is not permitted to add tags to this course"
 * }
 * 
 * @apiError (404) {Object} not-found-error The course with id sent was not found in database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to add tag for
 * 
 * @apiErrorExample 500-User-Not-Found:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to add tag for"
 * }
 * 
 * @apiError (500) {Object} Add-Tag-Error Could not add tag
 * 
 * @apiErrorExample 500-Tag-Add-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Internal error: could not add tag to course"
 * }
 * 
 */

/**
 * @api {delete} /api/courses/:id/tags Delete Tag From Course
 * @apiName DeleteTagFromCourse
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiParam {Object} tag The name of the tag you want to delete from the course
 * 
 * @apiParamExample {json} Tag Delete Example:
 * { 
        tag: 'Learning'
 * }
 * 
 * @apiSuccess (200) {string} Message A message that the tag was removed
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *     message: 'tag removed from course'
 *  }
 * 
 * @apiError (400) {Object} Missing-Tag-Data The tag data is absent
 * 
 * @apiErrorExample 400 Tag Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Missing tag data"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (403) {Object} bad-request-error The user is not authorized to remove tag from this course
 * 
 * @apiErrorExample 403-Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 *  "message": "User is not permitted to remove tags from this course"
 * }
 * 
 * @apiError (404) {Object} not-found-error The course with id sent was not found in database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "No course found with that ID"
 * }
 * 
 * @apiError (404) {Object} tag-not-found-error The tag with the name sent was not found in database
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "Tag not found"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to remove tag for
 * 
 * @apiErrorExample 500-User-Not-Found:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Could not find user to remove tag for"
 * }
 * 
 * @apiError (500) {Object} Delete-Tag-Error Could not remove tag
 * 
 * @apiErrorExample 500-Tag-Remove-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *  "message": "Internal error: could not remove from course"
 * }
 * 
 */

/**
 * @api {get} /api/courses/:id/sections Get Course Sections
 * @apiName GetCourseSections
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Array} Sections an array of the course sections
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "sections": [
 *         {
 *             "id": 1,
 *             "name": "What is Learning number 24?",
 *             "course_id": 1,
 *             "description": "Although living brains are very complex, this module uses metaphor and analogy to help simplify matters. You will discover several fundamentally different modes of thinking, and how you can use these modes to improve your learning. You will also be introduced to a tool for tackling procrastination, be given some practical information about memory, and discover surprisingly useful insights about learning and sleep. <br><br>(Please note that this module should only take about an hour--the extra time quoted relates to purely optional activities.)",
 *             "link": "https://www.coursera.org/learn/learning-how-to-learn/home/week/2",
 *             "order": 2
 *         }
 *     ]
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a course with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "could not find a course with an id of 4"
 * }
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find user to get sections for
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal-Server-Error
 * {
 *  "message": "Could not find user to get section for"
 * }
 * 
 */

/**
 * @api {get} /api/courses/:id/yoursections Get Your Course Sections
 * @apiName GetYourCourseSections
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Array} Sections an array of the course sections for the user
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "sections": [
 *     {
 *       "id": 5,
 *       "name": "Change IS possible",
 *       "course_id": 2,
 *       "description": "In today's world, change is the only constant. This means that whatever stage you are in life, you need to keep yourself open and able to change. How can you do this? In three ways: Learn more about your hidden capabilities and assets. Learn more about learning effectively. Learn about matching your assets with the opportunities that face you. In this week, we'll dive into these three important areas!",
 *       "link": "https://www.coursera.org/learn/mindshift/home/week/1",
 *       "order": 1,
 *       "manually_completed": 0,
 *       "automatically_completed": 0
 *     },
 *     {
 *       "id": 6,
 *       "name": "Getting deeper into happy learning",
 *       "course_id": 2,
 *       "description": "Key to your ability to mindshift is being able to learn effectively. This week, we’ll dive deeper into this vital area. Getting yourself motivated to tackle procrastination can sometimes be a challenge in learning, so we’ll give you some important tips here. But we’ll also give insights into mental tricks to help you focus, relax, and reframe if stress intrudes. We’ll also show you how to avoid common learning pitfalls. Welcome and enjoy!",
 *       "link": "https://www.coursera.org/learn/mindshift/home/week/2",
 *       "order": 2,
 *       "manually_completed": 0,
 *       "automatically_completed": 0
 *     },
 *     {
 *       "id": 7,
 *       "name": "Learning and careers",
 *       "course_id": 2,
 *       "description": "This week, we’ll be talking about how your own career can develop and change through your life. Your own internal feelings about what you want to do can play a critical role in your long-term happiness. But society and culture can also have a dramatic effect on your career choices and decisions—as can your parents, family, and friends. We’ll talk about second-skilling yourself, and developing a talent stack of average talents that can combine into a formidable asset. We’ll also talk about various tactics and techniques to help you survive career changes and upheavals. Welcome and enjoy!",
 *       "link": "https://www.coursera.org/learn/mindshift/home/week/3",
 *       "order": 3,
 *       "manually_completed": 0,
 *       "automatically_completed": 0
 *     },
 *     {
 *       "id": 8,
 *       "name": "Adopting a learning lifestyle",
 *       "course_id": 2,
 *       "description": "In this final week of the course, we'll be exploring how and why to keep yourself in 'mindshift' mode. We'll give you all sorts of insider tips on how to pick out the best online learning with materials that are right for you. And we'll also talk about other ways of learning—ways that can make you 'the smartest person in the room. Disruption lies ahead in the world—this week, we'll help you seize the advantage. Off we go for our final week of Mindshift!",
 *       "link": "https://www.coursera.org/learn/mindshift/home/week/4",
 *       "order": 4,
 *       "manually_completed": 0,
 *       "automatically_completed": 0
 *     }
 *   ]
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a course with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "could not find a course with an id of 4"
 * }
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find user to get sections for
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal-Server-Error
 * {
 *  "message": "Could not find user to get section for"
 * }
 * 
 */

/**
 * @api {post} /api/courses/:id/sections Post Course Section
 * @apiName PostCourseSection
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (201) {Object} Created message with id returned
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *     "message": "Section has been added",
 *     "id": 7
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find section to get course for
 * 
 */

/**
 * @api {put} /api/courses/:id/sections/:section_id Put Course Section
 * @apiName PutCourseSection
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 Updated
 * {
 *     "message": "Section has been updated"
 * }
 * 
 * @apiError (400) {Object} Missing-Section-Changes The section changes are absent
 * 
 * @apiErrorExample 400-Section-Changes-Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Could not find changes in body"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a section with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "Section not found with id of 4"
 * } 
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find section to get course for
 * 
 */

/**
 * @api {delete} /api/courses/:id/sections/:section_id Delete Course Section
 * @apiName DeleteCourseSection
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200
 * {
 *     "message": "Section has been deleted"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a section with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "Section not found with id of 4"
 * } 
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find section to get course for
 * 
 */

/**
 * @api {get} /api/courses/:id/sections/:s_id Get Section Details
 * @apiName GetSectionDetails
 * @apiGroup Details
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Array} Sections an array of the course sections
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK   
 *   {
 *       "courseSection": [
 *           {
 *               "id": 59,
 *               "name": "How to Become a Better Learner",
 *               "course_sections_id": 4,
 *               "description": "",
 *               "link": "https://www.coursera.org/learn/learning-how-to-learn/lecture/f839b/how-to-become-a-better-learner",
 *               "type": "video",
 *               "order": 1
 *           },
 *           {
 *               "id": 60,
 *               "name": "Introduction to Renaissance Learning and Unlocking Your Potential",
 *               "course_sections_id": 4,
 *               "description": "",
 *               "link": "https://www.coursera.org/learn/learning-how-to-learn/lecture/SIck3/introduction-to-renaissance-learning-and-unlocking-your-potential",
 *               "type": "video",
 *               "order": 2
 *           }
 *       ]
 *  }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a detail with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "could not find a detail with an id of 4"
 * }
 * 
 * @apiError (500) {Object} Find-Section-Error Could not find detail to get course for
 * 
 */

/**
 * @api {post} /api/courses/:id/sections/:s_id Post Section Details
 * @apiName PostSectionDetails
 * @apiGroup Details
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (201) {Object} Created message with id returned
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *     "message": "Detail has been added with an id of 7"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-Section-Error Could not post Detail to section
 * 
 */

/**
 * @api {put} /api/courses/:id/sections/:section_id/details/:detail_id Put Section Details
 * @apiName PutSectionDetails
 * @apiGroup Details
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 Updated
 * {
 *     "message": "Detail has been updated"
 * }
 * 
 * @apiError (400) {Object} Missing-Section-Changes The section changes are absent
 * 
 * @apiErrorExample 400-Section-Changes-Missing:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "Could not find changes in body"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a Detail with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "Detail 5 not found in Section 3"
 * } 
 * 
 * @apiError (500) {Object} Find-Section-Error Could not update detail from section
 * 
 */

/**
 * @api {delete} /api/courses/:id/sections/:section_id/details/:detail_id Delete Course Section Details
 * @apiName DeleteCourseSectionDetails
 * @apiGroup Details
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 
 * {
 *     "message": "Detail has been deleted"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (404) {Object} not-found-error could not find a detail with the passed in id
 * 
 * @apiErrorExample 404-Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "Detail 2 not found in Section 4"
 * } 
 * 
 * @apiError (500) {Object} Find-Section-Error Could not delete detail from section
 * 
 */

/**
 * @api {put} /api/courses/:id/sections/:section_id/details/:detail_id/togglecomplete Toggle Lesson Completion
 * @apiName ToggleLessonCompletion
 * @apiGroup Details
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 Updated
 * {
 *     "message": "Lesson completion toggled"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to update lesson for
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Could not find user to update lesson for"
 * }
 * 
 * @apiError (500) {Object} Toggle-Lesson-Error Internal Error: Could not toggle lesson completion
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Internal Error: Could not toggle lesson completion"
 * }
 * 
 */

/**
 * @api {put} /api/courses/:id/sections/:section_id/togglecomplete Toggle Section Completion
 * @apiName ToggleSectionCompletion
 * @apiGroup Sections
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 Updated
 * {
 *     "message": "Section completion toggled"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to update section for
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Could not find user to update section for"
 * }
 * 
 * @apiError (500) {Object} Toggle-Section-Error Internal Error: Could not toggle section completion
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Internal Error: Could not toggle section completion"
 * }
 * 
 */

/**
 * @api {put} /api/courses/:id/togglecomplete Toggle Course Completion
 * @apiName ToggleCourseCompletion
 * @apiGroup Courses
 * 
 * @apiHeader {string} Content-Type the type of content being sent
 * @apiHeader {string} token User's token for authorization
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "authorization": "sjvbhoi8uh87hfv8ogbo8iugy387gfofebcvudfbvouydyhf8377fg"
 * }
 * 
 * @apiSuccess (200) {Object} Updated message
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 Updated
 * {
 *     "message": "Course completion toggled"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization header is absent
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Forbidden Access!"
 * }
 * 
 * @apiError (401) {Object} bad-request-error The authorization is invalid
 * 
 * @apiErrorExample 401-Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *  "message": "Invalid Credentials"
 * }
 * 
 * @apiError (500) {Object} Find-User-Error Could not find user to update course for
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Could not find user to update course for"
 * }
 * 
 * @apiError (500) {Object} Toggle-Course-Error Internal Error: Could not toggle course completion
 * HTTP/1.1 500 Internal-Error
 * {
 *     "message": "Internal Error: Could not toggle course completion"
 * }
 * 
 */