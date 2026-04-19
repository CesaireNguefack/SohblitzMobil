import { Controller,UseFilters, Delete, Body, UploadedFile, Param, Post, Query, Get, ExceptionFilter, Catch,  ArgumentsHost, } from '@nestjs/common';
import { ServicesService } from './service.service';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { UseInterceptors } from '@nestjs/common';

@Catch()
export class UploadExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(200).json({
      success: false,
      data: null,
      message: exception.message,
    });
  }
}

@Controller("services")
export class ServicesController {
  private basePath = path.join(process.cwd(), 'service_data', 'images');

  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  createService(@Body() data: any) {
    return this.servicesService.createService(data)
  }

  @Get("/db")
  getServices() {
    return this.servicesService.getDBServices()
  }

  // ❌ DELETE
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.servicesService.deleteDBService(Number(id))
  }

  @Get()
  getAll(@Query("lang") lang: "de" | "fr" | "en") {
    return this.servicesService.getServices(lang)
  }

  @Get(":id")
  getOne(
    @Param("id") id: string,
    @Query("lang") lang: "de" | "fr" | "en"
  ) {
    return this.servicesService.getServiceById(Number(id), lang)
  }

  @Post('upload/:serviceId')
  @UseFilters(UploadExceptionFilter)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          try {
            const serviceId = req.params.serviceId;

            if (!serviceId || isNaN(Number(serviceId))) {
              return cb(new Error('Invalid serviceId'), '');
            }

            const uploadPath = path.resolve(
              'service_data',
              'images',
              String(serviceId)
            );

            fs.mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
          } catch (e) {
            cb(new Error('Destination error: ' + e), '');
          }
        },

        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);

          const baseName = path
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, '_');

          const uniqueName = `${Date.now()}-${baseName}${ext}`;

          cb(null, uniqueName);
        },
      }),

      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
      },
    })
  )
  async uploadServiceImage(
    @Param('serviceId') serviceId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        return {
          success: false,
          data: null,
        };
      }

      const pathResult = `/service_data/images/${serviceId}/${file.filename}`;

      return {
        success: true,
        data: pathResult,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
      };
    }
  }


  @Post('deleteImage')
  async deleteServiceImage(
    @Body() body: { path: string; serviceId: number }
  ) {
    const { path: imagePath, serviceId } = body;

    if (!imagePath || !serviceId) {
      return {
        success: false,
        message: 'Missing data'
      };
    }

    // 🔒 sécurité: éviter suppression hors dossier
    const fullPath = path.join(process.cwd(), imagePath);

    if (!fullPath.includes(`service_data${path.sep}images${path.sep}${serviceId}`)) {

      return {
        success: false,
        message: 'Invalid path'
      };
    }

    if (!fs.existsSync(fullPath)) {
      return {
        success: false,
        message: 'File not found'
      };
    }

    fs.unlinkSync(fullPath);

    return {
      success: true,
    };
  }


}

