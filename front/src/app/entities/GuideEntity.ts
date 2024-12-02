export interface GuideStep {
    id?: number;
    title: string;
    content: string;
    order?: number;
}


export interface GuideEntity {
    id?: number;
    title: string;
    description: string;
    icon_image: string;
    introduction: string;
    author: string;
    steps: GuideStep[];
} 

export interface GuideFormData {
        title: string;
        description: string;
        icon_image: File;
        introduction: string;
        author: string;
        steps: GuideStep[];
    }