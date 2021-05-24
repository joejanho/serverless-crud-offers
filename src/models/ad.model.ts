import { OfferInterface } from './offer.model';
import { v4 as UUID } from 'uuid';
import {IsNotEmpty, ArrayNotEmpty} from 'class-validator';

// Interfaces
interface IProps {
    id?: string;
    title: string;
    link: string;
    asset: string;
    offers: [OfferInterface];
}

interface AdInterface extends IProps {
    timestamp: number;
}

export default class AdModel {

    public id: string;
    @IsNotEmpty()
    public title: string;
    @IsNotEmpty()
    public link: string;
    @IsNotEmpty()
    public asset: string;
    @ArrayNotEmpty()
    public offers: [OfferInterface];

    constructor({ 
        id = UUID(), 
        title = null,
        link = null,
        offers = [] as any,
        asset = null
    }: IProps) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.asset = asset;
        this.offers = offers;
    }

    /**
     * Set Id
     * @param value
     */
    setId(value: string) {
        this.id = value !== '' ? value : null;
    }

    /**
     * Get Id
     * @return {string|*}
     */
    getId() {
        return this.id;
    }

    /**
     * Set      * Get Title

     * @param value
     */
    setTitle(value: string) {
        this.title = value !== '' ? value : null;
    }

    /**
     * Get Title
     * @return {string|*}
     */
    getTitle() {
        return this.title;
    }


    /**
     * Set Asset
     * @param value
     */
     setAsset(value: string) {
        this.asset = value !== '' ? value : null;
    }

    /**
     * Get Asset
     * @return {string|*}
     */
    getAsset() {
        return this.asset;
    }


    /**
     * Set Link
     * @param value
     */
     setLink(value: string) {
        this.link = value !== '' ? value : null;
    }

    /**
     * Get Link
     * @return {string|*}
     */
    getLink() {
        return this.link;
    }


    /**
     * Set Offers
     * @param value
     */
     setOffers(value: [OfferInterface]) {
        this.offers = value;
    }

    /**
     * Get Offers
     * @return {[OfferInterface]|*}
     */
    getOffers() {
        return this.offers;
    }

    /**
     * Get Base entity mappings
     * @return {OfferInterface}
     */
    getEntityMappings(): AdInterface {
        return {
            id: this.getId(),
            title: this.getTitle(),
            asset: this.getAsset(),
            link: this.getLink(),
            offers: this.getOffers(),
            timestamp: new Date().getTime(),
        };
    }

}