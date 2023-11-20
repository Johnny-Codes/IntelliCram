
export enum SelectedPage {
    Home = "home",
    Decks = "decks",
    Quizzes = "quizzes",
    ContactUs = "contactus"
}

export interface DeckType {
    icon: JSX.Element;
    title: string;
    description: string; 
}

export interface ReviewType {
    name: string;
    description?: string;
    image: string;
}