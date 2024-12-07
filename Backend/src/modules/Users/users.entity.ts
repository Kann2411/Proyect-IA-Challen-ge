import { ApiProperty } from '@nestjs/swagger';
import { RegistrationMethod } from 'src/enums/registrationMethod';
import { Role } from 'src/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'Identificador único del usuario',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    type: 'string',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    maxLength: 50,
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    maxLength: 128,
  })
  @Column({ type: 'varchar', length: 128 })
  password: string;

  @ApiProperty({
    description: 'URL de la imagen de perfil del usuario',
    type: 'string',
    nullable: true,
    default: 'default-image-url',
  })
  @Column({ type: 'varchar', nullable: true })
  imgUrl: string =
    'https://res.cloudinary.com/dgg9abj0i/image/upload/v1730043484/znl4jfzwva8qnueryxet.png';

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: Role,
    default: Role.User,
  })
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @ApiProperty({
    description: 'Método de registro del usuario',
    enum: RegistrationMethod,
    default: RegistrationMethod.Form,
  })
  @Column({
    type: 'enum',
    enum: RegistrationMethod,
    default: RegistrationMethod.Form,
  })
  registrationMethod: RegistrationMethod;

  @ApiProperty({
    description: 'Indica si el usuario está baneado',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  isBanned: boolean;
}
