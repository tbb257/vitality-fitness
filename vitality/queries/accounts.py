from pydantic import BaseModel
from .client import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hash_password: str


class AccountQueries(Queries):
    COLLECTION = "mongo-data"

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(
        self, info: AccountIn, hash_password: str
    ) -> AccountOutWithPassword:
        props = info.dict()
        if self.get(props["email"]) is not None:
            raise DuplicateAccountError()
        props["hash_password"] = hash_password
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)
