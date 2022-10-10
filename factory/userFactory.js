import { faker } from "@faker-js/faker";

export default function userFactory() {
  const data = {
    name: faker.name.firstName(),
    url: faker.image.animals(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return data;
}
