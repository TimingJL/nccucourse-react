export const coursesFilter = (courseList, searchParams) => {
    if (searchParams.size) {
        const result = courseList
            .filter((course) => {
                const matchArr = searchParams.map((param) => (
                    (course.get('id').indexOf(param) > -1) ||
                    (course.get('instructor').indexOf(param) > -1) ||
                    (course.get('instructor_eng').indexOf(param.toUpperCase()) > -1) ||
                    (course.get('name').indexOf(param) > -1) ||
                    (course.get('asgeneral').indexOf(param) > -1) ||
                    (course.get('change').indexOf(param) > -1) ||
                    (course.get('choose').indexOf(param) > -1) ||
                    (course.get('choose_eng').indexOf(param.toUpperCase()) > -1) ||
                    (course.get('name_eng').indexOf(param.toUpperCase()) > -1) ||
                    (course.get('coregeneral').indexOf(param) > -1) ||
                    (course.get('department').indexOf(param) > -1) ||
                    (course.get('generalclass').indexOf(param) > -1) ||
                    (course.get('language').indexOf(param) > -1) ||
                    (course.get('note').indexOf(param) > -1) ||
                    (course.get('place').indexOf(param) > -1) ||
                    (course.get('session').map((session) => session.get('weekday')).join().indexOf(param) > -1) ||
                    (course.get('session').map((session) => session.get('class')).join().indexOf(param.toUpperCase()) > -1)
                ));
                return !matchArr.toJS().includes(false);
            })
        return result;
    }
    return courseList;
};