export type ProjectCardProps = {
  project_creation_date: string
  project_description: string
  project_id: string
  project_name: string
  project_password: string
}


export type IconProps = {
  size: string
  color: string
}

export type ElementPageProps = {
  description: string
  image: string
  title: string
}

export type LoginProps = {
  email: string
  password: string
}
export type RegisterProps = {
  username: string
  email: string
  password: string
}

export type CardServiceProps = {
  description: string
  image: string
}

export type TeamsCardProps = {
  team_description: string
  team_id: number
  team_name: string
  team_private: boolean
}

export type MessageProps = {
  app_user_name: string
  app_user_email: string
  message_content: string
  message_date: string
}