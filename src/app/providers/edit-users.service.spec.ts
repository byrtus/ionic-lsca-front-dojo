import { TestBed } from '@angular/core/testing';

import { EditUsersService } from './edit-users.service';

describe('EditUsersService', () => {
  let service: EditUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
