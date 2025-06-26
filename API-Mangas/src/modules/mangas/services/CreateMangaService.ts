import { getCustomRepository } from "typeorm";
import Manga from "../typeorm/entities/Manga";
import MangasRepository from "../typeorm/repositories/MangasRepository";
import AppError from "@shared/errors/AppError";
import PublishersRepository from "@modules/publishers/typeorm/repositories/PublishersRepository";
import Publisher from "@modules/publishers/typeorm/entities/Publisher";

interface IRequest {
  title: string;
  author_name: string;
  target_demographic: string;
  quantity_volumes: number;
  publisher_name: string;
}


export default class CreateMangaService {
  public async execute({
    title,
    author_name,
    target_demographic,
    quantity_volumes,
    publisher_name,
  }: IRequest): Promise<Manga> {
    const mangasRepository = getCustomRepository(MangasRepository);
    const titleExists = await mangasRepository.findByTitle(title);
    if (titleExists) {
      throw new AppError("A manga with this name already exists!");
    }
    const publisherRepository = getCustomRepository(PublishersRepository);
    const existsPublisher = await publisherRepository.findByName(publisher_name);
    if (existsPublisher == undefined) {
      throw new AppError("This publishers doesnt exist!");
    }

    const manga = await mangasRepository.createManga({
      title,
      author_name,
      target_demographic,
      quantity_volumes,
      publisher: existsPublisher,
    });
    return manga;
  }
}
