export class ProjectModel {
    source: string;
    link: string;

    constructor(source: string, link: string) {
        (this.link = link), (this.source = source);
    }
}
