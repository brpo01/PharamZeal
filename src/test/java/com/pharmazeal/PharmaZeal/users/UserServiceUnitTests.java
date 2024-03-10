package com.pharmazeal.PharmaZeal.users;


import com.pharmazeal.PharmaZeal.dto.requests.NewUserRequestDTO;
import com.pharmazeal.PharmaZeal.dto.factories.User_DTO_Factory;
import com.pharmazeal.PharmaZeal.models.repositories.AddressRepository;
import com.pharmazeal.PharmaZeal.models.repositories.RoleRepository;
import com.pharmazeal.PharmaZeal.models.repositories.UserRepository;
import com.pharmazeal.PharmaZeal.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import static org.mockito.Mockito.*;

@SpringBootTest()
public class UserServiceUnitTests {

    @Test
    public void when_CreateUserCalled_Expect_NewUserCreation() {

        NewUserRequestDTO mockUserRequestDTO = mock(NewUserRequestDTO.class);
        UserRepository mockUserRepository = mock(UserRepository.class);
        RoleRepository mockRoleRepository = mock(RoleRepository.class);
        AddressRepository mockAddressRepository = mock(AddressRepository.class);
        User_DTO_Factory userMapper = mock(User_DTO_Factory.class);
        BCryptPasswordEncoder passwordEncoder = mock(BCryptPasswordEncoder.class);

        UserService userService = new UserService(passwordEncoder, userMapper, mockUserRepository, mockRoleRepository, mockAddressRepository);

        userService.createUser(mockUserRequestDTO);

        verify(passwordEncoder, times(1)).encode(mockUserRequestDTO.getPassword());

        verify(mockUserRepository, times(1)).findByEmailAddress(mockUserRequestDTO.getEmailAddress());

        verify(mockUserRepository, times(1)).findByPhoneNumber(mockUserRequestDTO.getPhoneNumber());
    }

}
