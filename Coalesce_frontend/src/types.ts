export interface PostType {
	id: string;
	postNumber: number;
	poster: string;
	content: string;
	date: Date;
	admin: boolean;
	title: string;
	replyTo: number | null;
	OP: boolean;
	IP: string;
	replies: Array<number>;
}

export type PublicPostType = Omit<PostType, 'IP'>;
export type NewPostType = Omit<PostType, 'id' | 'postNumber' | 'IP' | 'date' | 'admin'>;