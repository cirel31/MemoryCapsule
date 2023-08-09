import ProjectForm from "../../components/project/ProjectForm";
import "../../styles/ProjectCreate.scss"
import photo_picto from "../../assets/images/signup/upload.svg"
import Project_create_bg from "../../assets/images/projectcreate/Projectcreate.svg"
const ProjectCreatePage = () => {
  return (
      <div className="project_create_body">
        <img src={Project_create_bg} className="project_create_back"/>

        <ProjectForm />
      </div>
  )
}

export default ProjectCreatePage;
