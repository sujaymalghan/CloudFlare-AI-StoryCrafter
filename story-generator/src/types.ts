export interface StoryData{
    story: string;
    imageUrl: string;
}
export interface StoryFormProps {
    onSubmit: (prompt: string) => void;
    loading: boolean;
  }

  export interface StoryCardProps {
    story: string | null;
    imageUrl: string | null;
  }


  