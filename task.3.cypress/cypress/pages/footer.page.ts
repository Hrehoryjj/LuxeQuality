import { BasePage } from './base.page';

export class FooterPage extends BasePage {
    protected getFooterColumnLinks(columnHeading: string) {
        return this.footerContainer
            .contains(columnHeading)
            .parent()
            .find('a');
    }

    getFooterLinkHrefs(columnHeading: string): Cypress.Chainable<string[]> {
        return this.getFooterColumnLinks(columnHeading).then(($links) => {
            const hrefs: string[] = [];
            $links.each((_, el) => {
                const href = el.getAttribute('href');
                if (href) hrefs.push(href);
            });
            return hrefs;
        });
    }
}