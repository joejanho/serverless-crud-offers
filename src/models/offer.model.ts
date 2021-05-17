import {v4 as UUID} from 'uuid';
import {OfferType} from '../enums/offer.type.enum';
import {ArticleType} from '../enums/article-type.enum';
import {IsNotEmpty, ArrayNotEmpty, IsNumber} from 'class-validator';
// Interfaces
interface IProps {
    id?: string;
    title: string;
    offerType: OfferType;
    offerValue: number;
    activationDate: Date,
    endDate: Date,
    articleTpes: [ArticleType]
}

export interface OfferInterface extends IProps {
    timestamp: number;
}

export default class OfferModel {
    private id: string;
    @IsNotEmpty()
    private title: string;
    @IsNotEmpty()
    private offerType: OfferType;
    @IsNumber()
    private offerValue: number;
    private activationDate: Date;
    private endDate: Date;
    @ArrayNotEmpty()
    private articleTpes: [ArticleType];

    constructor({ 
        id = UUID(),
        title = null,
        offerType =null,
        offerValue = null,
        activationDate = null,
        endDate = null,
        articleTpes = null
        }: IProps) {
        this.id = id;
        this.title = title;
        this.offerType = offerType;
        this.offerValue = offerValue;
        this.activationDate = activationDate;
        this.endDate = endDate;
        this.articleTpes = articleTpes;
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
     * Set Offer Type
     * @param value
     */
     setOfferType(value: OfferType) {
        this.offerType = value;
    }

    /**
     * Get OfferType
     * @return {OfferType|*}
     */
    getOfferType() {
        return this.offerType;
    }


    /**
     * Set Offer Value
     * @param value
     */
     setLink(value: number) {
        this.offerValue = value;
    }

    /**
     * Get Offer Value
     * @return {number|*}
    */
    getOfferValue() {
        return this.offerValue;
    }

    /**
     * Set Activation Date
     * @param value
    */
    setActivationDate(value:Date) {
        this.activationDate = value;
    }

    /**
     * Get Activation Date
     * @return {Date|*}
     */
    getActivationDate() {
        return this.activationDate;
    }

    /**
     * Set End Date
     * @param value
    */
     setEndDate(value:Date) {
        this.endDate = value;
    }

    /**
     * Get End Date
     * @return {Date|*}
     */
    getEndDate() {
        return this.endDate;
    }

    /**
     * Set Article Types
     * @param value
    */
    setArticleTypes(value:[ArticleType]) {
        this.articleTpes = value;
    }

    /**
     * Get End Date
     * @return {[ArticleType]|*}
    */
    getArticleTypes() {
        return this.articleTpes;
    }   

    /**
     * Get Base entity mappings
     * @return {OfferInterface}
     */
    getEntityMappings(): OfferInterface {
        return {
            id: this.getId(),
            title: this.getTitle(),
            offerType: this.getOfferType(),
            offerValue: this.getOfferValue(),
            activationDate: this.getActivationDate(),
            endDate: this.getEndDate(),
            articleTpes: this.getArticleTypes(),
            timestamp: new Date().getTime(),
        };
    }

}